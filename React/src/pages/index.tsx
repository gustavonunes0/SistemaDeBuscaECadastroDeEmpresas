import React, { useState, useEffect, ChangeEvent } from 'react';
import Head from 'next/head';
import * as S from '../styles/home';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import axios from 'axios';

  const formatCNPJ = (cnpj: string): string => {
    const cleanedCNPJ = cnpj.replace(/[^\d]/g, '');
    
    if (cleanedCNPJ.length <= 2) {
      return cleanedCNPJ;
    } else if (cleanedCNPJ.length <= 5) {
      return `${cleanedCNPJ.slice(0, 2)}.${cleanedCNPJ.slice(2)}`;
    } else if (cleanedCNPJ.length <= 8) {
      return `${cleanedCNPJ.slice(0, 2)}.${cleanedCNPJ.slice(2, 5)}.${cleanedCNPJ.slice(5)}`;
    } else if (cleanedCNPJ.length <= 12) {
      return `${cleanedCNPJ.slice(0, 2)}.${cleanedCNPJ.slice(2, 5)}.${cleanedCNPJ.slice(5, 8)}/${cleanedCNPJ.slice(8)}`;
    } else {
      return `${cleanedCNPJ.slice(0, 2)}.${cleanedCNPJ.slice(2, 5)}.${cleanedCNPJ.slice(5, 8)}/${cleanedCNPJ.slice(8, 12)}-${cleanedCNPJ.slice(12)}`;
    }
  };

  const Home = () => {
    const [cnpj, setCNPJ] = useState<string>('');
    const [companyData, setCompanyData] = useState<any>(null);
  
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setCNPJ(formatCNPJ(inputValue));
    };
  
    function removerCaracteresEspeciais(cnpj: string) {
      const cnpjSemEspeciais = cnpj.replace(/[^\d]/g, '');
      return cnpjSemEspeciais;
    }

    const fetchCompanyData = async () => {
        try {
          const cleanedCNPJ = removerCaracteresEspeciais(cnpj);
          const response = await axios.get(`https://publica.cnpj.ws/cnpj/${cleanedCNPJ}`);
          setCompanyData(response.data);
        } catch (error) {
          alert('CNPJ não encontrado!');
        }
      };
    
      const handleSearch = () => {
        if (cnpj.length === 18) {
          fetchCompanyData();
        } else {
          setCompanyData(null);
        }
      };
  
    return (
      <>
        <Head>
            <title>Consulta de CNPJ</title>
            <meta name="description" content="Generated by create next app"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            <link rel="icon" href="/OlhoSetima.svg"/>
        </Head>
        <NavBar />
        <S.Main>
        <S.ContainerPrincipal>
          <S.SpanPrincipal>Consulte o CNPJ de qualquer empresa do Brasil em poucos segundos</S.SpanPrincipal>
          <S.InputCNPJ
            type="text"
            placeholder="Busque pelo CNPJ da empresa"
            value={cnpj}
            onChange={handleInputChange}
          />
          <S.ButtonSearch onClick={handleSearch}>Buscar</S.ButtonSearch>
          {companyData && (
            <S.ContainerInfosCNPJ>
              <S.itemCNPJ>Razão Social: {companyData.razao_social}</S.itemCNPJ>
              <S.itemCNPJ>CNPJ: {companyData.estabelecimento.cnpj}</S.itemCNPJ>
              <S.itemCNPJ>Logradouro: {companyData.estabelecimento.logradouro}</S.itemCNPJ>
              <S.itemCNPJ>Número: {companyData.estabelecimento.numero}</S.itemCNPJ>
              <S.itemCNPJ>Complemento: {companyData.estabelecimento.complemento}</S.itemCNPJ>
              <S.itemCNPJ>Cidade: {companyData.estabelecimento.cidade.nome}</S.itemCNPJ>
              <S.itemCNPJ>Estado: {companyData.estabelecimento.estado.nome}</S.itemCNPJ>
            </S.ContainerInfosCNPJ>
          )}
        </S.ContainerPrincipal>
      </S.Main>
        <Footer />
      </>
    );
  };
  
  export default Home;