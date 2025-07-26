export default function SimpleForm() {
  return (
    <div style={{ 
      padding: '40px', 
      backgroundColor: '#1a1a1a', 
      margin: '20px',
      borderRadius: '10px',
      zIndex: 9999,
      position: 'relative'
    }}>
      <h2 style={{ color: 'white', marginBottom: '20px', fontSize: '24px' }}>
        Test Form - Can you click here?
      </h2>
      
      <input 
        type="text" 
        placeholder="Type here to test..."
        style={{
          width: '100%',
          padding: '15px',
          fontSize: '18px',
          marginBottom: '20px',
          backgroundColor: 'white',
          color: 'black',
          border: '2px solid #333',
          borderRadius: '5px'
        }}
        onClick={() => alert('Input clicked!')}
        onChange={(e) => console.log('Input changed:', e.target.value)}
      />
      
      <button 
        onClick={() => alert('Button works!')}
        style={{
          padding: '15px 30px',
          fontSize: '18px',
          backgroundColor: '#dc2626',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Test Button - Click Me
      </button>
      
      <a 
        href="https://wa.me/213797496469" 
        target="_blank"
        style={{
          display: 'inline-block',
          marginLeft: '20px',
          padding: '15px 30px',
          backgroundColor: '#16a34a',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}
      >
        WhatsApp Link Test
      </a>
    </div>
  );
}