document.addEventListener('DOMContentLoaded', function() {
    // Function to read the CSV file and parse it
    function parseCSV(file) {
        Papa.parse(file, {
            download: true,
            complete: function(results) {
                let data = results.data;
                processData(data);
            }
        });
    }

    // let gallery = document.getElementById('imageGallery');
    // images.forEach(src => {
    //     let img = document.createElement('img');
    //     img.src = src;
    //     img.addEventListener('click', function() {
    //         openModal(src);
    //     });
    //     gallery.appendChild(img);
    // });

    function openModal(src) {
        let modal = document.getElementById('myModal');
        let modalImage = document.getElementById('modalImage');
        modal.style.display = "block";
        modalImage.src = src;
    }

    // Close the modal
    let closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.onclick = function() {
        let modal = document.getElementById('myModal');
        modal.style.display = "none";
    }

    // Close the modal when clicking outside the image
    window.onclick = function(event) {
        let modal = document.getElementById('myModal');
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // Process and display the data
    function processData(data) {
        // Sort data by year, placing "N/A" at the end
        let sortedData = data.sort((a, b) => {
            if (a[3] === "N/A") return 1;
            if (b[3] === "N/A") return -1;
            return a[3] - b[3];
        });

        // Assuming you have multiple columns with the class name 'column'
        let columns = document.querySelectorAll('.column');
        let columnIndex = 0;

        // Create and append img tags to the columns
        sortedData.forEach(row => {
            let imageWrapper = document.createElement('div');
            imageWrapper.className = 'image-wrapper';

            let img = document.createElement('img');
            img.src = `media/${row[0]}.jpg`; // Constructing the path using template literal
            img.addEventListener('click', function() {
                openModal(`media/${row[0]}.jpg`);
            });
            imageWrapper.appendChild(img);

            let tooltip = document.createElement('div');
            tooltip.className = 'image-tooltip';
            tooltip.textContent = `Author: ${row[1]}, Title: ${row[2]}, Year: ${row[3]}`;
            imageWrapper.appendChild(tooltip);

            columns[columnIndex].appendChild(imageWrapper);

            // Move to the next column, reset if you've reached the last one
            columnIndex = (columnIndex + 1) % columns.length;
        });
    }

    parseCSV('metadata.csv');
});