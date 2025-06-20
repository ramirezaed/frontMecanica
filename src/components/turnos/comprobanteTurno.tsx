'use client';

import React, { useEffect, useRef } from 'react';
import {
  FaUser,
  FaCalendarAlt,
  FaCar,
  FaIdBadge,
  FaDollarSign,
  FaClipboardList,
  FaTools,
} from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Link from 'next/link';
import Image from 'next/image';

export const TurnoComprobante = ({
  turno,
}: {
  turno: {
    codigo_turno: string;
    qrCode?: string;
    nombre: string;
    apellido: string;
    fechaLocal: string; // Formateada desde backend (ej: "19/07/2026 16:00")
    tipo_vehiculo: string;
    modelo: string;
    precio: number;
    matricula: string;
    servicio: {
      nombre: string;
      descripcion: string;
      precio: string;
    };
  };
}) => {
  const qrCodeToShow = turno.qrCode || turno.codigo_turno;
  const comprobanteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generarPDF = async () => {
      if (!comprobanteRef.current) return;

      try {
        const canvas = await html2canvas(comprobanteRef.current, {
          scale: 2,
          useCORS: true,
          logging: false,
        });

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(canvas, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Comprobante_Turno_${turno.nombre}_${turno.apellido}.pdf`);
      } catch (error) {
        console.error('Error al generar PDF:', error);
      }
    };

    generarPDF();
  }, [turno]);

  return (
    <div className="print:p-0">
      <div
        ref={comprobanteRef}
        className="border rounded-2xl p-8 shadow-lg max-w-2xl mx-auto bg-white print:shadow-none print:border-none font-sans"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-700 tracking-wide">
          Comprobante de Turno
        </h2>

        {qrCodeToShow && (
          <div className="flex justify-center mb-8">
            <Image
              src={qrCodeToShow}
              alt="Código QR del turno"
              width={500}
              height={500}
              className="w-44 h-44 border-4 border-gray-200 rounded-xl shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/fallback-qr.png';
              }}
            />
          </div>
        )}

        <div className="grid gap-6 text-gray-700 text-base">
          <InfoRow
            icon={<FaUser className="text-gray-600" />}
            label="Nombre"
            value={`${turno.nombre} ${turno.apellido}`}
          />
          <InfoRow
            icon={<FaCalendarAlt className="text-gray-600" />}
            label="Fecha y Hora"
            value={turno.fechaLocal}
          />
          <InfoRow
            icon={<FaCar className="text-gray-600" />}
            label="Vehículo"
            value={`${turno.tipo_vehiculo} ${turno.modelo}`}
          />
          <InfoRow
            icon={<FaIdBadge className="text-gray-600" />}
            label="Matrícula"
            value={turno.matricula}
          />
          <InfoRow
            icon={<FaTools className="text-gray-600" />}
            label="Servicio"
            value={turno.servicio.nombre}
          />
          <InfoRow
            icon={<FaClipboardList className="text-gray-600" />}
            label="Descripcion"
            value={turno.servicio.descripcion}
          />

          <InfoRow
            icon={<FaDollarSign className="text-gray-600 justify-center" />}
            label="Precio"
            value={turno.servicio.precio}
          />
        </div>
      </div>

      <div className="max-w-2xl py-5 mx-auto mt-6 print:hidden">
        <button
          onClick={() => window.print()}
          className="w-full py-3 bg-gray-800 text-white px-4 rounded-xl hover:bg-gray-700 transition-colors font-semibold tracking-wide"
        >
          Imprimir Comprobante
        </button>

        <Link href="/" className="block mt-4">
          <button className="w-full py-3 bg-gray-600 text-white px-4 rounded-xl hover:bg-gray-500 transition-colors font-semibold tracking-wide">
            Volver al Inicio
          </button>
        </Link>
      </div>
    </div>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center justify-between border-b pb-3">
    <div className="flex items-center gap-2 font-semibold text-gray-600">
      {icon}
      <span>{label}:</span>
    </div>
    <span className="text-right font-medium">
      {typeof value === 'number' ? value.toLocaleString('es-AR') : value}
    </span>
  </div>
);
