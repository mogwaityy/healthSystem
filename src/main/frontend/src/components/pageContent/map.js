import React, { useState, useEffect } from 'react';

function NHSBSADataComponent() {
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const query = {
                resource_id: 'DISP_NAMEADDRESS_202404', // Adjust with actual resource ID
                limit: 5,
                q: '{"TOTAL_QUANTITY":"40:*"}'  // Modify query as needed
            };
            const url = new URL('https://opendata.nhsbsa.net/api/3/action/datastore_search');

            Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));

            try {
                const response = await fetch(url);
                const data = await response.json();
                setRecords(data.result.records);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>NHSBSA Data</h1>
            <ul>
                {records.map((record, index) => (
                    <li key={index}>
                        Application No: {record.applicationNo}, Name: {record.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NHSBSADataComponent;
