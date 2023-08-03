document.addEventListener('DOMContentLoaded', function () {
    const downloadButton = document.getElementById('download-button');
    downloadButton.addEventListener('click', () => {
        window.location.href = "/download";
        // fetch("/download")
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error("Network response was not ok");
        //         }
        //         // Convert the response to a Blob (binary data) and create a URL for the file
        //         return response.blob();
        //     })
        //     .then(blob => {
        //         const url = URL.createObjectURL(blob);
        //         // Create a temporary anchor element to trigger the download
        //         const downloadLink = document.createElement("a");
        //         downloadLink.href = url;
        //         // downloadLink.download = "app.apk"; // Replace with the desired filename and extension
        //         downloadLink.click();
        //         // Cleanup: revoke the URL object after the download is completed
        //         URL.revokeObjectURL(url);
        //     })
        //     .catch(error => {
        //         console.error("Error:", error);
        //     });
    });
});