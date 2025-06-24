import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';

const appDiv = document.querySelector('#app')
appDiv.innerHTML = `
<main>
  <h1>Lab 12</h1>
  <select id="order-select">
    <option value="asc">Data - rosnąco</option>
    <option value="desc">Data - malejąco</option>
    <option value="name-asc">Nazwa - alfabetycznie</option>
  </select>

  <div id="container"></div>>

  <h2>Dodaj artykuł</h2>
  <form id="article-form">
    <input type="text" id="title" placeholder="Tytuł" required />
    <input type="text" id="subtitle" placeholder="Podtytuł" required />
    <input type="text" id="author" placeholder="Autor" required />
    <textarea id="content" placeholder="Treść" required></textarea>
    <input type="date" id="created_at" required />
    <button type="submit">OK</button>
  </form>
</main>
`