from flask import Flask, jsonify, request
import sqlite3
import uuid
import json
import time 
import datetime

app = Flask(__name__)
DB = "sqlite.db"

def init_db():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("""CREATE TABLE IF NOT EXISTS room (
        id TEXT PRIMAY KEY, 
        status TEXT,
        updated TEXT        
    )""")
    c.execute("""CREATE TABLE IF NOT EXISTS player (
        token TEXT PRIMARY KEY,
        room_id TEXT,
        name TEXT,   
    )""")