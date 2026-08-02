import { supabase } from './lib/supabase'

export default async function Home() {
  const { data, error } = await supabase
    .from('mart_loan_risk_summary')
    .select('*')
    .order('default_rate_pct', { ascending: false })

  if (error) {
    return <div className="p-8 text-red-600">Error cargando datos: {error.message}</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Loan Risk Dashboard</h1>
      <p className="text-gray-600 mb-8">Análisis de riesgo de préstamos por propósito</p>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Propósito</th>
              <th className="p-4 font-semibold text-gray-700">Total Préstamos</th>
              <th className="p-4 font-semibold text-gray-700">Tasa de Impago</th>
              <th className="p-4 font-semibold text-gray-700">Tasa Interés Prom.</th>
              <th className="p-4 font-semibold text-gray-700">FICO Prom.</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row) => (
              <tr key={row.purpose} className="border-b hover:bg-gray-50">
                <td className="p-4 capitalize">{row.purpose.replace('_', ' ')}</td>
                <td className="p-4">{row.total_loans}</td>
                <td className="p-4 font-semibold text-red-600">{row.default_rate_pct}%</td>
                <td className="p-4">{row.avg_interest_rate_pct}%</td>
                <td className="p-4">{row.avg_fico_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}