import './style.css'

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://pvcimhnfgiravzozqtdq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2Y2ltaG5mZ2lyYXZ6b3pxdGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NTU2MDgsImV4cCI6MjA2NjIzMTYwOH0.UhWz0o62sCSxBuxhU8N_t7kB_HtehYQdY8MrMBL4CyI'
const supabase = createClient(supabaseUrl, supabaseKey)
import { format } from 'date-fns';

async function getArticles() {
  let container = document.querySelector('#container')
  let orderSelect = document.querySelector('#order-select')
  let sortOrder = orderSelect ? orderSelect.value : 'created_at.desc';
  let [column, direction] = sortOrder.split('.');

  if (!column || !direction || !['asc', 'desc'].includes(direction)) {
    column = 'created_at';
    direction = 'desc';
  }

  let { data: article, error } = await supabase
    .from('article')
    .select('title, subtitle, author, created_at, content')
    .order(column, { ascending: direction === 'asc' })



  let htmlArticles = ''
  article.forEach((item) => {
    let formattedDate = item.created_at ? format(new Date(item.created_at), 'dd-MM-yyyy') : 'Nieznana data';
    htmlArticles += `<div class="article p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
      <h3 class="text-xl font-semibold mb-2">Tytuł: ${item.title}</h3>
      <h4 class="text-md font-medium text-gray-700 mb-1">Podtytuł: ${item.subtitle}</h4>
      <h5 class="text-sm text-gray-500 mb-1">Autor: ${item.author}</h5>
      <h5 class="text-sm text-gray-400 mb-3">Data utworzenia: ${formattedDate}</h5>
      <p class="text-gray-800">Treść:${item.content}</p>
    </div>`;
  });

  container.innerHTML = htmlArticles
}

document.addEventListener('DOMContentLoaded', () => {
  getArticles()

  const articleForm = document.querySelector('#article-form');
  articleForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(articleForm);
    const title = formData.get('title');
    const subtitle = formData.get('subtitle');
    const author = formData.get('author');
    const content = formData.get('content');
    const created_at = new Date(formData.get('created_at')).toISOString();

    const { data, error } = await supabase
      .from('article')
      .insert([{ title, subtitle, author, content, created_at }]);

    if (error) {
      console.error('Error inserting article:', error);
    } else {
      console.log('Article inserted:', data);
      getArticles()
      articleForm.reset()
    }
  })

  const orderSelect = document.getElementById('order-select');
  orderSelect.addEventListener('change', getArticles);

})



