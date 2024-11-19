import React, { useState, useEffect } from 'react';
import { Star, DollarSign, TrendingUp, FileText, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from "../fondos/burbujas";

const IconButton = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-start gap-2 px-4 py-2 rounded-md transition-colors ${
      isActive ? "bg-amber-500 text-white" : "bg-white text-amber-800 hover:bg-amber-100"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const reportTypes = [
  { id: 'avgRating', name: 'Promedio de Calificación', icon: <Star className="w-4 h-4" /> },
  { id: 'avgPrice', name: 'Precio Promedio', icon: <DollarSign className="w-4 h-4" /> },
  { id: 'ranking', name: 'Ranking de Cervecerías', icon: <TrendingUp className="w-4 h-4" /> },
];

const ReportesCervecerias = () => {
  const [selectedReport, setSelectedReport] = useState(reportTypes[0].id);
  const [cervezasData, setCervezasData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCervezas = async (cerveceriaId) => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/cervezas/${cerveceriaId}`);
        const data = await response.json();
        setCervezasData(data);
      } catch (error) {
        console.error('Error fetching cervezas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCervezas(1); // Llamar con cervecería ID 1 por ejemplo
  }, []);

  const exportToTXT = () => {
    let content = '';

    switch (selectedReport) {
      case 'avgRating':
        content = 'Cervecería\tCalificación Promedio\tTotal de Calificaciones\n';
        cervezasData.forEach(cerveza => {
          content += `${cerveza.nombre}\t${cerveza.promedio_calificacion}\t${cerveza.total_calificaciones}\n`;
        });
        break;
      case 'avgPrice':
        content = 'Cervecería\tPrecio Promedio (MXN)\n';
        cervezasData.forEach(cerveza => {
          content += `${cerveza.nombre}\t${cerveza.precio.toFixed(2)}\n`;
        });
        break;
      case 'ranking':
        content = 'Ranking\tCervecería\tCalificación Promedio\n';
        cervezasData
          .sort((a, b) => b.promedio_calificacion - a.promedio_calificacion)
          .forEach((cerveza, index) => {
            content += `${index + 1}\t${cerveza.nombre}\t${cerveza.promedio_calificacion}\n`;
          });
        break;
      default:
        return;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'reporte_cervecerias.txt';
    link.click();
  };

  const renderReportContent = () => {
    if (loading) {
      return <p>Cargando datos...</p>;
    }

    const renderTableRows = (rows) => (
      rows.map((cerveza, index) => (
        <tr key={cerveza.nombre}>
          <td className="border px-4 py-2 text-black">{index + 1}</td>
          <td className="border px-4 py-2 text-black">{cerveza.nombre}</td>
          <td className="border px-4 py-2 text-black">{cerveza.promedio_calificacion}</td>
        </tr>
      ))
    );

    switch (selectedReport) {
      case 'avgRating':
        return (
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-black">Cervecería</th>
                <th className="px-4 py-2 text-black">Calificación Promedio</th>
                <th className="px-4 py-2 text-black">Total de Calificaciones</th>
              </tr>
            </thead>
            <tbody>{renderTableRows(cervezasData)}</tbody>
          </table>
        );
      case 'avgPrice':
        return (
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-black">Cervecería</th>
                <th className="px-4 py-2 text-black">Precio Promedio (MXN)</th>
              </tr>
            </thead>
            <tbody>
              {cervezasData.map((cerveza) => (
                <tr key={cerveza.nombre}>
                  <td className="border px-4 py-2 text-black">{cerveza.nombre}</td>
                  <td className="border px-4 py-2 text-black">${cerveza.precio.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'ranking':
        const sortedData = cervezasData.sort((a, b) => b.promedio_calificacion - a.promedio_calificacion);
        return (
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-black">Ranking</th>
                <th className="px-4 py-2 text-black">Cervecería</th>
                <th className="px-4 py-2 text-black">Calificación Promedio</th>
              </tr>
            </thead>
            <tbody>{renderTableRows(sortedData)}</tbody>
          </table>
        );
      default:
        return <p>Selecciona un tipo de reporte para ver los detalles.</p>;
    }
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-zinc-900 text-white">
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
      </div>
      <div className="relative z-10 container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-amber-500">Reportes de Cervecerías</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {reportTypes.map((report) => (
            <IconButton
              key={report.id}
              icon={report.icon}
              label={report.name}
              isActive={selectedReport === report.id}
              onClick={() => setSelectedReport(report.id)}
            />
          ))}
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-amber-500">
            {reportTypes.find(r => r.id === selectedReport)?.name}
          </h2>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={exportToTXT}
              className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors"
            >
              <FileText className="w-4 h-4 inline-block mr-2" />
              Exportar Reporte
            </button>
          </div>
          <div className="overflow-x-auto">
            {renderReportContent()}
          </div>
        </div>
        <div className="flex justify-end">
          <button className="bg-zinc-700 text-white px-4 py-2 rounded-md hover:bg-zinc-600 transition-colors">
            <Settings className="w-4 h-4 inline-block mr-2" />
            Configurar Reportes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportesCervecerias;
