/**
 * O principio de responsabilidade unica diz que um componente deve ter uma e apenas uma razão para mudar
 *
 * 1. Reduz a complexidade
 * 2. Melhora a  reusabilidade
 * 3. Facilita os testes
 * 4; Melhora a manutenibilidade de um componente/projeto
 */

import { useQuery } from '@tanstack/react-query'

import { ActionBar } from './components/action-bar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table'
import { api } from './lib/axios'

interface Product {
  id: string
  title: string
  price: number
}

export function App() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('/products?limit=10')
      return response.data
    },
    retry: false,
  })

  return (
    <div className="flex flex-col max-w-5xl mx-auto mt-10 space-y-10">
      <h1 className="text-lg font-bold ">Estoque</h1>

      <ActionBar />

      {isLoading && <span>Carregando...</span>}

      {products && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Quantidade</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product: Product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>
                  {Number(product.price).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {isError && <span>Ocorreu um erro...</span>}
    </div>
  )
}
