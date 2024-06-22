import React, { useEffect, useState } from 'react';
import xml2js from 'xml2js';

const DiagramComponent = () => {
    const [diagramData, setDiagramData] = useState(null);

    useEffect(() => {
        fetch('/path/to/your/diagram.xml')
            .then(response => response.text())
            .then(data => {
                xml2js.parseString(data, (err, result) => {
                    if (err) {
                        console.error('Error parsing XML:', err);
                    } else {
                        setDiagramData(result);
                    }
                });
            })
            .catch(error => console.error('Error fetching XML:', error));
    }, []);

    if (!diagramData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Diagram Data</h1>
            <pre>{JSON.stringify(diagramData, null, 2)}</pre>
        </div>
    );
};

export default DiagramComponent;
