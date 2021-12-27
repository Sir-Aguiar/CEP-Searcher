import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { FiSearch } from 'react-icons/fi'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from './api/API'
export default function Home() {
  const [inputValue, setInput] = useState('')

  const [CEP, setCep] = useState({})

  async function handleAlert() {
    if (inputValue == '') {
      toast.error("Por favor, preencha o campo de CEP")
      document.getElementById('input').focus()
      return
    }
    try {
      const response = await API.get(`${inputValue}/json`)
      setCep(response.data)
      setInput('')
    }
    catch {
      toast.warning('CEP inválido')
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Busque seu CEP</title>
      </Head>
      <h1>Busque seu CEP</h1>
      <div className={styles.input_place}>
        <input
          type='text'
          placeholder='Digite seu CEP : '
          value={inputValue}
          onChange={
            (e) => {
              setInput(e.target.value)
            }
          }
          id='input'
          maxLength={8}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAlert()
            }
          }}
        />
        <button className={styles.button_search} onClick={handleAlert}>
          <FiSearch
            size={23}
            color='#fff'
          />
        </button>
      </div>
      {
        Object.keys(CEP).length > 0 && (
          <main className={styles.main_container}>
            <h2>{CEP.cep}</h2>
            <p>Rua : {CEP.logradouro}</p>
            <p>Bairro : {CEP.bairro}</p>
            <p> {CEP.localidade} - {CEP.uf}</p>
          </main>
        )
      }
      <ToastContainer autoClose={3000} />
    </div>
  )
}
