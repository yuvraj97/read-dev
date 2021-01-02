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

def get_files_loc(curr_loc, d):
    for f in os.listdir(curr_loc):
        if "." not in f:
            get_files_loc(os.path.join(curr_loc, f), d)
        else:
            if(f.split('.')[-1] == "css"):
                d["css"].append(os.path.join(curr_loc, f))
            elif(f.split('.')[-1] == "js"):
                d["js"].append(os.path.join(curr_loc, f))
            elif(f.split('.')[-1] == "html"):
                d["html"].append(os.path.join(curr_loc, f))

origin = {"css": [], "js": [], "html": []}
get_files_loc(os.getcwd(), origin)
    
# # stream = os.popen('dir')
# # output = stream.read()

failed_html = []
for html_file in origin["html"]:
    try:
        f = open(html_file, "r")
        html = f.read()
        f.close()
        
        minified = htmlmin.minify(html, 
                                  remove_empty_space=True,
                                  remove_comments=True)
        # minified = minified.replace('\t', ' ')
        # minified = minified.replace('\n', ' ')
        # minified = minified.replace('\r', ' ')
        # while minified.find("  ") != -1:
        #     minified = minified.replace("  ", " ")
        output_file = html_file.replace("read-dev","read-dev-deploy")
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        f = open(output_file, "w+")
        f.write(minified)
        f.close()
    except Exception as e:
        print(e)
        failed_html.append(html_file)


from csscompressor import compress

failed_css = []
for css_file in origin["css"]:
    if css_file == 'C:\\Users\\OS\\Documents\\GitHub\\read-dev\\data\\assets\\css\\katex.min.css':
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
        failed_css.append(css_file)
        


# '''  JS Minification '''
# js_file = origin["js"][5]
# input_file  = js_file.replace("\\", "/")
# output_file = js_file.replace("\\", "/").replace("read-dev","read-dev-deploy") 
# os.makedirs(os.path.dirname(output_file), exist_ok=True)
# stream = os.popen('uglify')
# output = stream.read()


# f = open(js_file, "r")
# js= f.read()
# f.close()

# params = urlencode([
#     ('js_code', js),
#     ('compilation_level', 'ADVANCED_OPTIMIZATIONS'),
#     ('output_format', 'text'),
#     ('output_info', 'compiled_code'),
#   ])

# # Always use the following value for the Content-type header.
# headers = { "Content-type": "application/x-www-form-urlencoded" }
# conn = httplib.HTTPSConnection('closure-compiler.appspot.com')
# conn.request('POST', '/compile', params, headers)
# response = conn.getresponse()
# minified = response.read()
# print(minified)

# output_file = js_file.replace("read-dev","read-dev-deploy")
# os.makedirs(os.path.dirname(output_file), exist_ok=True)
# f = open(output_file, "w+")
# f.write(str(minified))
# f.close()

# conn.close()