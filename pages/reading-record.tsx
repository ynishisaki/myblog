import { Button, Center, Box } from '@chakra-ui/react';

const BooksPage = ({ movies }) => {
  console.log(movies);

  return (
    <main>
      {/* <Header /> */}
      {/* <Container> */}
      {/* <h4>Recommended for You</h4> */}

      <Box>
        test
        {/* {movies.data.map((movie) => (
          <Wrap key={movie.contents_id}>
            <Link href={`/detail/${movie.contents_id}`}>
              <a>
                <img src={movie.thumbnail_url} alt={`${movie.title}のサムネイル`} />
              </a>
            </Link>
          </Wrap> */}
        {/* ))} */}
      </Box>
      {/* </Container> */}
    </main>
  );
};

export async function getStaticProps() {
  const isbn_list = ['978-4-7631-6115-4', '978-4046054036'];
  const URL = 'https://api.openbd.jp/v1/get?isbn=978-C4046054036';

  // 外部APIのデータをフェッチ
  const response = await fetch(URL, {
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  const movies = await response.json();

  return {
    props: {
      movies,
    },
  };
}

export default BooksPage;
