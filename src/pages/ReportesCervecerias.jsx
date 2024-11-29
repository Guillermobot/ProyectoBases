import React, { useState, useEffect } from "react";
import { Beer, Star, DollarSign, Percent } from "lucide-react";

const ReportesCervecerias = () => {
  const [cervezasData, setCervezasData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reporteActual, setReporteActual] = useState("mejorCalificacion");

  useEffect(() => {
    fetchData();
  }, [reporteActual]);

  const fetchData = () => {
    setLoading(true);
    let endpoint = "/cervezas/top";
    if (reporteActual === "menorPrecio") {
      endpoint = "/cervezas/mas-baratas";
    } else if (reporteActual === "mayorAlcohol") {
      endpoint = "/cervezas/mayor-alcohol";
    }
    fetch(`http://localhost:3000${endpoint}`)
      .then((response) => response.json())
      .then((data) => {
        setCervezasData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const cambiarReporte = (reporte) => {
    setReporteActual(reporte);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );
  if (error)
    return <div className="text-red-500 p-4 text-center">Error: {error}</div>;

  return (
    <div className="p-6 bg-amber-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-amber-800 flex items-center justify-center">
        <Beer className="mr-2" />
        Reportes de Cervezas
      </h1>
      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={() => cambiarReporte("mejorCalificacion")}
          className={`px-4 py-2 rounded-full flex items-center transition-colors ${
            reporteActual === "mejorCalificacion"
              ? "bg-amber-600 text-white"
              : "bg-white text-amber-600 hover:bg-amber-100"
          }`}
        >
          <Star className="mr-2" />
          Mejor Calificación
        </button>
        <button
          onClick={() => cambiarReporte("menorPrecio")}
          className={`px-4 py-2 rounded-full flex items-center transition-colors ${
            reporteActual === "menorPrecio"
              ? "bg-amber-600 text-white"
              : "bg-white text-amber-600 hover:bg-amber-100"
          }`}
        >
          <DollarSign className="mr-2" />
          Menor Precio
        </button>
        <button
          onClick={() => cambiarReporte("mayorAlcohol")}
          className={`px-4 py-2 rounded-full flex items-center transition-colors ${
            reporteActual === "mayorAlcohol"
              ? "bg-amber-600 text-white"
              : "bg-white text-amber-600 hover:bg-amber-100"
          }`}
        >
          <Percent className="mr-2" />
          Mayor Alcohol
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-screen bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-amber-600 text-white">
            <tr>
              <th className="p-3 text-left">ID Cervecería</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">
                {reporteActual === "mejorCalificacion" && "Calificación"}
                {reporteActual === "menorPrecio" && "Precio"}
                {reporteActual === "mayorAlcohol" && "Alcohol (%)"}
              </th>
            </tr>
          </thead>
          <tbody>
            {cervezasData.map((cerveza, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-amber-100" : "bg-white"}
              >
                <td className="p-3 border-t">{cerveza.cerveceria_id}</td>
                <td className="p-3 border-t font-medium">{cerveza.nombre}</td>
                <td className="p-3 border-t">
                  <div className="flex items-center">
                    {reporteActual === "mejorCalificacion" && (
                      <>
                        <span className="mr-2">{cerveza.calificacion}</span>
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      </>
                    )}
                    {reporteActual === "menorPrecio" && (
                      <>
                        <DollarSign className="w-5 h-5 text-green-600 mr-1" />
                        <span>{cerveza.precio}</span>
                      </>
                    )}
                    {reporteActual === "mayorAlcohol" && (
                      <>
                        <span className="mr-2">
                          {cerveza.porcentaje_alcohol}
                        </span>
                        <Percent className="w-5 h-5 text-blue-600" />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportesCervecerias;
