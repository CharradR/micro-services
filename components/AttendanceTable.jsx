import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Search } from "lucide-react";

export default function AttendanceTable() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

    const simulatedCourses = ["Mathématiques", "Informatique", "Physique", "Chimie", "Littérature", "Histoire", "Biologie", "Géographie"];

    useEffect(() => {
        axios
            .get("http://localhost:8088/api/attendance")
            .then((response) => {
                const dataWithSimulatedCourses = response.data.map((record, index) => ({
                    ...record,
                    cours: simulatedCourses[index % simulatedCourses.length],
                }));
                setAttendanceData(dataWithSimulatedCourses);
            })
            .catch((error) => {
                console.error("Error fetching attendance data:", error);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const sortedData = [...attendanceData].sort((a, b) => {
        if (sortConfig.key) {
            const aVal = String(a[sortConfig.key] || "").toLowerCase();
            const bVal = String(b[sortConfig.key] || "").toLowerCase();

            if (typeof a[sortConfig.key] === 'boolean' && typeof b[sortConfig.key] === 'boolean') {
                if (a[sortConfig.key] === b[sortConfig.key]) return 0;
                return sortConfig.direction === "ascending" ? (a[sortConfig.key] ? -1 : 1) : (a[sortConfig.key] ? 1 : -1);
            }

            if (aVal < bVal) return sortConfig.direction === "ascending" ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
    });

    const filteredData = sortedData.filter((record) =>
        record.studentName?.toLowerCase().includes(searchTerm) ||
        record.cours?.toLowerCase().includes(searchTerm) ||
        record.exam?.toLowerCase().includes(searchTerm)
    );

    const requestSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-8 flex flex-col items-center">
            {/* NOUVEAU TITRE AJOUTÉ ICI, AU DESSUS DE LA CARTE PRINCIPALE */}
            <h2 className="text-5xl font-extrabold text-gray-800 mb-8 text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">
                    Système de Gestion de Présence
                </span>
            </h2>
            {/* FIN DU NOUVEAU TITRE */}

            <div className="w-full max-w-5xl bg-white shadow-xl rounded-lg p-8 transform transition-all duration-300">

                {/* Section Entête (contient l'ancien titre 'Registres de Présence' et la barre de recherche) */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                    <h1 className="text-4xl font-extrabold text-gray-800 text-center sm:text-left">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                            Registres de Présence
                        </span>
                    </h1>
                    <div className="relative flex items-center w-full sm:w-auto">
                        <Input
                            type="text"
                            placeholder="Rechercher par nom, cours ou examen..."
                            onChange={handleSearch}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200 w-full"
                        />
                        <Search className="absolute left-3 text-gray-400" size={20} />
                    </div>
                </div>

                {/* Section Tableau */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
                        <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
                        <tr className="text-left">
                            <th
                                className="px-6 py-3 text-sm font-semibold tracking-wider cursor-pointer transition duration-150 hover:bg-indigo-700"
                                onClick={() => requestSort("studentName")}
                            >
                                Nom de l'étudiant <ArrowUpDown className="inline w-4 h-4 ml-1" />
                            </th>
                            <th
                                className="px-6 py-3 text-sm font-semibold tracking-wider cursor-pointer transition duration-150 hover:bg-indigo-700"
                                onClick={() => requestSort("cours")}
                            >
                                Cours <ArrowUpDown className="inline w-4 h-4 ml-1" />
                            </th>
                            <th
                                className="px-6 py-3 text-sm font-semibold tracking-wider cursor-pointer transition duration-150 hover:bg-indigo-700"
                                onClick={() => requestSort("exam")}
                            >
                                Examen <ArrowUpDown className="inline w-4 h-4 ml-1" />
                            </th>
                            <th
                                className="px-6 py-3 text-sm font-semibold tracking-wider cursor-pointer transition duration-150 hover:bg-indigo-700"
                                onClick={() => requestSort("present")}
                            >
                                Présent <ArrowUpDown className="inline w-4 h-4 ml-1" />
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {filteredData.length > 0 ? (
                            filteredData.map((record, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition duration-100 ease-in-out">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{record.studentName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{record.cours}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{record.exam}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {record.present ? (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Oui
                        </span>
                                        ) : (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Non
                        </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500 text-lg">
                                    Aucune donnée de présence trouvée.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                {filteredData.length > 0 && (
                    <p className="mt-4 text-sm text-gray-600 text-right">
                        Affichage de {filteredData.length} enregistrement(s).
                    </p>
                )}
            </div>
        </div>
    );
}