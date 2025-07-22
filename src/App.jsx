import DropZone from './components/DropZone';

function App() {
  return (
    <div style={{ maxWidth: 540, margin: '40px auto', padding: 16 }}>
      <h1 style={{ color: '#09269b', textAlign: 'center', fontWeight: 800, marginBottom: 24 }}>
        IRSA - Procesador de Excel/CSV
      </h1>
      <DropZone />
    </div>
  );
}

export default App;
