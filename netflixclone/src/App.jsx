import React, {useEffect, useState} from "react";
import './App.css'
import tmdb from "./components/tmdb";
import MovieRow from "./components/MovieRow";
import FeatureMovie from "./components/FeatureMovie";
import Header from './components/Header';

export default () =>{

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () =>{
      
      // Pegando a lista total
      let list = await tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Feature
      let animation = list.filter(i=> i.slug === 'animation1');
      let randomChosen = Math.floor(Math.random() * (animation[0].items.results.length - 1));
      let chosen = animation[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 100){
        setBlackHeader(true);
      }
      else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

  }, [])

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featureData && 
        <FeatureMovie item={featureData} />
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        Feito por <a href="https://github.com/Rodrigo-L-Oliveira" target="_blank">Rodrigo-L-Oliveira</a><br/>
        Direitos de imagem para a Netflix e respectivas empresas<br/>
        Dados pegos do site themoviedb.org
      </footer>
      

      {movieList.length <= 0 &&
      <div className="loading">
          <img src="https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2_w200.gif" alt="carregando" />
      </div>
      }
    </div>
  );
}