import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as jsdom from 'jsdom';
const { JSDOM } = jsdom;

@Injectable()
export class ProductService {
  async getProdutosDepartamentosJuridicos() {
    const listaDeProdutos = [];
    const respostaSite = await axios({
      method: 'get',
      url: 'https://docato.com.br/solucoes/departamentos-juridicos',
    });
    const dom = new JSDOM(respostaSite.data);

    const document = dom.window.document;

    const arrayNomeDepartamentosJuridicos = document
      .getElementById('accordion')
      .querySelectorAll('div[class=card]');

    for (const produto of arrayNomeDepartamentosJuridicos) {
      const nomeProduto = produto
        .querySelector('span')
        .innerHTML.trim()
        .replace(/<[^>]*>/gm, '');
      const descricaoProduto = produto
        .querySelector('small')
        .innerHTML.trim()
        .replace(/<[^>]*>/gm, '')
        .split(';');
      const itemProduto = {
        name: nomeProduto || '',
        description: descricaoProduto || '',
        link: 'https://docato.com.br/solucoes/departamentos-juridicos',
      };
      listaDeProdutos.push(itemProduto);
    }

    return listaDeProdutos;
  }

  async getProdutosEscritoriosAdvocacia() {
    const listaDeProdutos = [];
    const respostaSite = await axios({
      method: 'get',
      url: 'https://docato.com.br/solucoes/escritorios-advocacia',
    });
    const dom = new JSDOM(respostaSite.data);

    const document = dom.window.document;

    const arrayNomeEscritoriosAdvocacia = document.querySelectorAll(
      "div[class='col-lg-6 d-flex align-items-center']",
    );

    for (const produto of arrayNomeEscritoriosAdvocacia) {
      const nomeProduto = produto
        .querySelector('h4')
        .innerText.trim()
        .replace(/<[^>]*>/gm, '');
      const descricaoProduto = produto
        .querySelector('h3')
        .innerText.trim()
        .replace(/<[^>]*>/gm, '')
        .split(';');
      const itemProduto = {
        name: nomeProduto ? nomeProduto : '',
        description: descricaoProduto ? descricaoProduto : '',
        link: 'https://docato.com.br/solucoes/escritorios-advocacia',
      };
      listaDeProdutos.push(itemProduto);
    }

    return listaDeProdutos;
  }

  async getProdutosNegociosFinanceiro() {
    const listaDeProdutos = [];

    const respostaSite = await axios({
      method: 'get',
      url: 'https://docato.com.br/solucoes/operacoes-financeiras',
    });
    const dom = new JSDOM(respostaSite.data);

    const document = dom.window.document;

    const arrayNegociosFinanceiro = document.querySelectorAll(
      "div[class='card-operacoes col-lg-6 col-md-6 col-sm-12 col-12']",
    );

    for (const produto of arrayNegociosFinanceiro) {
      const nomeProduto = produto
        .querySelector('h4')
        .innerHTML.trim()
        .replace(/<[^>]*>/gm, '');
      const descricaoProduto = produto
        .querySelector('h5')
        .innerHTML.trim()
        .replace(/<[^>]*>/gm, '')
        .replace('amp;', '')
        .split(';');
      const itemProduto = {
        name: nomeProduto || '',
        description: descricaoProduto || '',
        link: 'https://docato.com.br/solucoes/operacoes-financeiras',
      };
      listaDeProdutos.push(itemProduto);
    }

    return listaDeProdutos;
  }

  async findAll() {
    const promisses = [
      this.getProdutosNegociosFinanceiro(),
      this.getProdutosDepartamentosJuridicos(),
      this.getProdutosDepartamentosJuridicos(),
    ];

    const res = await Promise.all(promisses);

    return [...res[0], ...res[1], ...res[2]];
  }
}
