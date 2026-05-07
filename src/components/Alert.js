import React from 'react';

function Alert({ alert }) {
  if (!alert) return null;

  const capitalize = (word) =>
    word ? word.charAt(0).toUpperCase() + word.slice(1) : '';

  return (
    <div style={{ position: 'fixed', top: '70px', right: '20px', zIndex: 9999, minWidth: '280px' }}>
      <div className={`alert alert-${alert.type} alert-dismissible shadow`} role="alert">
        <strong>{capitalize(alert.type)}!</strong> {alert.msg}
      </div>
    </div>
  );
}

export default Alert;