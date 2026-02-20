import InfiniteGrid from '../components/movie/InfiniteGrid';

const TvSeriesPage = () => {
  return (
    <>
      <main className='px-5 md:py-5'>
        <InfiniteGrid type='tv' />
      </main>
    </>
  );
};

export default TvSeriesPage;