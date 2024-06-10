import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';
import { useState, ChangeEvent, FormEvent } from 'react'
import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from '../../components/Header'
import { toast } from 'react-toastify';



type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps {
  categoryList: ItemProps[];
}


export default function Product({ categoryList }: CategoryProps) {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);


  //quando seleciana uma nova categoria na lista
  function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
    setCategorySelected(Number(e.target.value));

  }


  //cadastrar produto
  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      const data = new FormData();
      if (name === '' || price === '' || description === '') {
        toast.error("Preencha todos os campos")
        return;
      }

      data.append('name', name)
      data.append('price', price)
      data.append('description', description)
      data.append('category_id', categories[categorySelected].id)
      data.append('banner', 'null');
      
 

      const apliClient = setupAPIClient();
      await apliClient.post('/product', data)

      toast.success('Cadastrado com sucesso')

      setName('')
      setPrice('')
      setDescription('')
    

    } catch (err) {
      console.log(err);
      toast.error("Erro ao cadastrar, revise o formulário")
    }


  }

  return (
    <>
      <Head>
        <title>Novo produto </title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form className={styles.form} onSubmit={handleRegister}>

            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                )

              })}
            </select>

            <input
              type="text"
              placeholder="Digite o nome do produto"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Preço do produto"
              className={styles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <textarea
              placeholder="Descreva seu produto..."
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>

          </form>

        </main>

      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apliClient = setupAPIClient(ctx)

  const response = await apliClient.get('/category');
  

  return {
    props: {
      categoryList: response.data
    }
  }
})
