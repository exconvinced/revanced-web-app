import helper.helper as h
from flask import Flask, render_template, request, Response, jsonify, send_file


app = Flask(__name__)
global_data = None
unpatched_apk = None
unpatched_apk_info = None
download_filename = None

# Clear cache files on reload
h.remove_files_in_directory()


@app.route("/upload", methods=["POST"])
def upload():
    global unpatched_apk, unpatched_apk_info, download_filename

    # Save uploaded file to temp directory
    temp_apk = "bin/apk/unpatched.apk"
    if "file" not in request.files:
        return "No file part"
    file = request.files["file"]
    if file.filename == "":
        return "No selected file"
    file.save(temp_apk)

    # Check with android manifest if file is a valid apk
    temp_apk_info = h.read_apk_file(temp_apk)
    if not temp_apk_info:
        # Declare valid apk not found
        unpatched_apk = None
        unpatched_apk_info = None
        return jsonify({"error": "Invalid file"}), 500
    else:
        # Save valid package info in memory
        unpatched_apk = temp_apk
        unpatched_apk_info = temp_apk_info

        package_name = unpatched_apk_info["package_name"]
        package_version = unpatched_apk_info["package_version"]
        download_filename = package_name
        compatible_patches = list(
            h.get_compatible_patches(package_name, package_version)
        )

        data = {
            "package_info": unpatched_apk_info,
            "compatible_patches": compatible_patches,
        }

        return jsonify(data)


@app.route("/send", methods=["POST"])
def send():
    global global_data
    global_data = request.json
    return jsonify({"result": "success"})


@app.route("/progress")
def progress():
    def revanced_args():
        global global_data
        return h.generate_revanced_args(global_data) if global_data else ""

    return Response(
        h.start_revanced_patch(revanced_args()), content_type="text/event-stream"
    )


@app.route("/download")
def download():
    response = send_file(
        h.retrieve_patched_apk(),
        as_attachment=True,
        download_name=f"{download_filename}.revanced.patched.apk",
    )
    return response


@app.route("/")
def dashboard():
    return render_template("index.html")



if h.is_java_sdk_installed():
    if __name__ == "__main__":
        print("hello")
        app.run(host="0.0.0.0")
else:
    print("Java SDK 11 not found. Please install and try again.")
    print(h.get_jdk_url())
    exit("Exiting...")
