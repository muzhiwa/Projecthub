import React from 'react';


function AdvicePage() {
  // Advice data
  const adviceList = [];
  
  return (
    <div className="advice-page">
      <ul>
        {adviceList.map((advice, index) => (
          <li key={index}>{advice}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdvicePage;
