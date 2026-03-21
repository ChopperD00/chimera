#!/usr/bin/env python3
"""NERV Dashboard Server — serves static files + proxies live data"""
import http.server
import json
import os
import urllib.request

PORT = 8888
HOME = os.path.expanduser('~')

class NERVHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=HOME, **kwargs)

    def do_GET(self):
        # /api/mesh → serve mesh-status.json
        if self.path == '/api/mesh':
            try:
                with open(os.path.join(HOME, 'mesh-status.json')) as f:
                    data = f.read()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(data.encode())
            except:
                self.send_error(500)
            return

        # /telemetry.json → serve telemetry.json
        if self.path.startswith('/telemetry.json'):
            try:
                with open(os.path.join(HOME, 'telemetry.json')) as f:
                    data = f.read()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Cache-Control', 'no-cache')
                self.end_headers()
                self.wfile.write(data.encode())
            except:
                self.send_error(500)
            return

        # /api/ollama/* → proxy to Ollama
        if self.path.startswith('/api/ollama/'):
            real_path = self.path.replace('/api/ollama', '')
            try:
                req = urllib.request.Request(f'http://localhost:11434{real_path}')
                with urllib.request.urlopen(req, timeout=5) as resp:
                    data = resp.read()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(data)
            except:
                self.send_error(502)
            return

        # Everything else → static files
        super().do_GET()

    def do_POST(self):
        # /api/ollama/* → proxy POST to Ollama
        if self.path.startswith('/api/ollama/'):
            real_path = self.path.replace('/api/ollama', '')
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length)
            try:
                req = urllib.request.Request(
                    f'http://localhost:11434{real_path}',
                    data=body,
                    headers={'Content-Type': 'application/json'},
                    method='POST'
                )
                with urllib.request.urlopen(req, timeout=30) as resp:
                    data = resp.read()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(data)
            except Exception as e:
                self.send_response(502)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode())
            return

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def log_message(self, format, *args):
        pass  # Silence logs

if __name__ == '__main__':
    server = http.server.HTTPServer(('0.0.0.0', PORT), NERVHandler)
    print(f'NERV Dashboard Server running on port {PORT}')
    server.serve_forever()