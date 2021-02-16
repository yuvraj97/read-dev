# -*- coding: utf-8 -*-
"""
Created on Sat Jan  2 05:04:12 2021

@author: OS
"""

import os
import htmlmin
import http.client as httplib
from urllib.parse import urlencode
import sys
from shutil import copyfile

skip_files = ["py.py", "requirements.txt", ".gitignore"]
skip_folders = ["tobeadded", "staged", ".vscode", ".git", "notebook-img"]
remove_files = ["initialize.js", "inline.css",
                # Don't Count    
                "style.css", "style-dark.css", "style-light.css", "TODO.txt"
               ]
files_without_ext = ["_redirects"]
do_not_print_ext = ["png", "webp", "svg", "html", "woff2", "woff", "ttf"]

def ext_in_do_not_print_ext(f):
    if("." not in f): return True
    for ext in do_not_print_ext:
        if ext in f:
            return True
    return False

def get_files_loc(curr_loc, d):
    for f in os.listdir(curr_loc):
        # if not ext_in_do_not_print_ext(f): print(f'"{f}"')
        if f in skip_folders or f in skip_files or f in remove_files:
            # if not ext_in_do_not_print_ext(f): print("\t continue")
            continue
        if '.' not in f and f not in files_without_ext:
            # if not ext_in_do_not_print_ext(f): print("\t '.' not in f and f not in files_without_ext")
            get_files_loc(os.path.join(curr_loc, f), d)
        else:
            splited = f.split('.')
            # if not ext_in_do_not_print_ext(f): print("\t else")
            if("css" in splited and "min" not in splited):
                d["css"].append(os.path.join(curr_loc, f))
            # elif("js" in splited):
            #     d["js"].append(os.path.join(curr_loc, f))
            elif("html" in splited):
                d["html"].append(os.path.join(curr_loc, f))
            else:
                d["others"].append(os.path.join(curr_loc, f))

origin = {"css": [], "js": [], "html": [], "others": []}
get_files_loc(os.getcwd(), origin)

# # stream = os.popen('dir')
# # output = stream.read()

failed_html = []
for html_file in origin["html"]:
    try:
        f = open(html_file, "r")#, encoding="utf8")
        html = f.read()
        html = html.replace("% equation","")
        html = html.replace("%equation","")
        html = html.replace("%blank line","")
        f.close()
        
        minified = htmlmin.minify(html, 
                                  remove_empty_space=True,
                                  remove_comments=True)
        output_file = html_file.replace("read-dev","read-dev-deploy")
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        f = open(output_file, "w+")
        f.write(minified)
        f.close()
    except Exception as e:
        # print(e)
        print("FAILED", html_file)
        failed_html.append(html_file)


from csscompressor import compress

failed_css = []
for css_file in origin["css"]:
    if css_file == 'C:\\Users\\OS\\Documents\\GitHub\\read-dev\\data\\katex\\katex.min.css':
        continue
    try:
        f = open(css_file, "r")
        css = f.read()
        f.close()
        minified = compress(css)
        
        output_file = css_file.replace("read-dev","read-dev-deploy")
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        f = open(output_file, "w+")
        f.write(minified)
        f.close()
    except:
        print("FAILED", css_file)
        failed_css.append(css_file)

failed = []
failed.extend(failed_html)
failed.extend(failed_css)
origin["others"].extend(failed)

for input_file in origin["others"]:
    # print(input_file)
    output_file = input_file.replace("read-dev","read-dev-deploy")
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    copyfile(input_file, output_file)

import js_minifier
js_minifier.run()