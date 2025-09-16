import Categories from "./_components/Categories";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import PopularProducts from "./_components/PopularProducts";
export default function Home() {
  return (
    <div>
      {/* Header */}

      <Header/>
       {/* Hero */}
       <Hero/>
        {/* Category List*/}

<Categories/>
         {/* Product List*/}

<PopularProducts/>
          {/* Footer*/}
    </div>
  );
}
