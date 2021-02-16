from urllib.parse import urlencode
import http.client as httplib
import os
# Define the parameters for the POST request and encode them in
# a URL-safe format.
def run():
    js_urls = [
        "https://bitbucket.org/yuvraj_97/unknown/raw/f1b0840fc290bc9080b33390aafcf4c2d6790129/chapter.js",
        "https://bitbucket.org/yuvraj_97/unknown/raw/f1b0840fc290bc9080b33390aafcf4c2d6790129/script.js",
        "https://bitbucket.org/yuvraj_97/unknown/raw/f1b0840fc290bc9080b33390aafcf4c2d6790129/swiped-events.js",
    ]

    for js_url in js_urls:
        try:
            params = urlencode([
                ('code_url', js_url),
                ('compilation_level', 'SIMPLE_OPTIMIZATIONS'),
                ('output_format', 'text'),
                ('output_info', 'compiled_code'),
            ])

            # print(params)
            # Always use the following value for the Content-type header.
            headers = { "Content-type": "application/x-www-form-urlencoded" }
            conn = httplib.HTTPSConnection('closure-compiler.appspot.com')
            conn.request('POST', '/compile', params, headers)
            response = conn.getresponse()
            minified = response.read()
            # print(minified)
            conn.close()
            output_folder = os.path.join(os.getcwd(), "..", "read-dev-deploy", "data", "js")
            os.makedirs(output_folder, exist_ok=True)
            output_file = os.path.join(os.getcwd(), "..", "read-dev-deploy", "data", "js", js_url.split("/")[-1])
            f = open(output_file, "w+")
            f.write(minified.decode("utf-8"))
            f.close()
            print("Done:", js_url)
        except:
            print("Failed:", js_url)
