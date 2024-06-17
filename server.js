const express = require('express');
const fileUpload = require('express-fileupload');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(fileUpload());
app.use(express.static('public'));

app.post('/convert-pdf-to-word', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let pdfFile = req.files.pdfFile;
    let outputPath = path.join(__dirname, 'output', `${Date.now()}.docx`);

    // Command to convert PDF to Word (you need to have LibreOffice or a similar tool installed)
    let command = `libreoffice --headless --convert-to docx --outdir ${path.dirname(outputPath)} ${pdfFile.tempFilePath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.json({ success: false, error: error.message });
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }

        res.json({ success: true, downloadUrl: `/output/${path.basename(outputPath)}` });
    });

    // Move the uploaded file to a temporary location
    let tempPath = path.join(__dirname, 'tmp', pdfFile.name);
    pdfFile.mv(tempPath, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
