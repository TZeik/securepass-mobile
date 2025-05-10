
import React, { createContext, useState, useContext } from 'react';

type AccessRecord = {
  id: number;
  name: string;
  time: string;
  fullName: string;
  idNumber: string;
  vehicle: string;
  entryDate: string;
  entryTime: string;
  visitPurpose: string;
  contactPerson: string;
  department: string;
};

type AccessContextType = {
  accessRecords: AccessRecord[];
  addAccessRecord: (record: AccessRecord) => void;
  removeAccessRecord: (id: number) => void;
};

const AccessContext = createContext<AccessContextType>({
  accessRecords: [],
  addAccessRecord: () => {},
  removeAccessRecord: () => {},
});

export const AccessProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [accessRecords, setAccessRecords] = useState<AccessRecord[]>([
    { 
      id: 1, 
      name: "Juan Pérez", 
      time: "09:15 AM",
      fullName: "Juan Alberto Pérez González",
      idNumber: "402-31824212-3",
      vehicle: "Toyota Corolla 2020 - ABC123",
      entryDate: "15/05/2023",
      entryTime: "09:00 AM",
      visitPurpose: "Reunión de negocios",
      contactPerson: "Carlos Méndez",
      department: "Ventas"
    },
    { 
      id: 2, 
      name: "María García", 
      time: "10:30 AM",
      fullName: "María José García Rodríguez",
      idNumber: "402-31824212-2",
      vehicle: "Nissan Sentra 2019 - XYZ987",
      entryDate: "15/05/2023",
      entryTime: "10:00 AM",
      visitPurpose: "Entrega de documentos",
      contactPerson: "Ana López",
      department: "Contabilidad"
    },
  ]);

  const addAccessRecord = (record: AccessRecord) => {
    setAccessRecords(prev => [...prev, record]);
  };

  const removeAccessRecord = (id: number) => {
    setAccessRecords(prev => prev.filter(record => record.id !== id));
  };

  return (
    <AccessContext.Provider value={{ accessRecords, addAccessRecord, removeAccessRecord }}>
      {children}
    </AccessContext.Provider>
  );
};

export const useAccess = () => useContext(AccessContext);