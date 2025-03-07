import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useUserData, useRemoveBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import type { User } from '../models/User';
import type { Book } from '../models/Book';
import { GET_ME } from '../graphql/queries';  // ✅ Import the query!


const SavedBooks = () => {
  const { data, refetch } = useUserData();
  const [removeBookMutation] = useRemoveBook();

  const [userData, setUserData] = useState<User>({
    username: '',
    email: '',
    password: '',
    savedBooks: [],
  });

  useEffect(() => {
    if (data?.me) {
      console.log("🔄 Updating userData with:", data.me);
      setUserData(data.me);
    }
  }, [data]);

  const handleDeleteBook = async (bookId: string) => {
    if (!bookId) {
      console.error("❌ ERROR: bookId is undefined! Cannot delete.");
      return;
    }
  
    console.log(`🗑 Deleting book with ID: ${bookId}`);
  
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      console.error("❌ No token found, user is not logged in.");
      return;
    }
  
    try {
      const { data } = await removeBookMutation({
        variables: { bookId },
        update: (cache) => {
          // ✅ **Fix: Remove book from Apollo Cache**
          const existingData = cache.readQuery<{ me: User }>({ query: GET_ME });
  
          if (existingData?.me) {
            const updatedBooks = existingData.me.savedBooks.filter((book) => book.bookId !== bookId);
            cache.writeQuery({
              query: GET_ME,
              data: { me: { ...existingData.me, savedBooks: updatedBooks } },
            });
          }
        }
      });
  
      if (data?.removeBook) {
        console.log("✅ Book deleted successfully:", bookId);
  
        // ✅ **Remove from Local Storage**
        removeBookId(bookId);
  
        // ✅ **Instantly Update UI**
        setUserData((prevUserData) => ({
          ...prevUserData,
          savedBooks: prevUserData.savedBooks.filter((book) => book.bookId !== bookId),
        }));
  
        // ✅ **Refetch Data to Sync with Backend**
        await refetch();
      }
    } catch (err) {
      console.error("❌ Error deleting book:", err);
    }
  };  
  
  
  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          <h1>Viewing {userData.username}'s saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book, index) => {
            console.log(`📝 Rendering Book ${index + 1}:`, book);

            // 🔥 Ensure bookId is assigned properly
            const formattedBook: Book = {
              bookId: book.bookId || `fallback-key-${index}`,
              title: book.title || "Unknown Title",
              authors: book.authors || ["Unknown Author"],
              description: book.description || "No description available.",
              image: book.image || "https://via.placeholder.com/150",
              link: book.link || "#",
            };

            return (
              <Col md='4' key={formattedBook.bookId}>
                <Card border='dark'>
                  <Card.Img
                    src={formattedBook.image}
                    alt={`The cover for ${formattedBook.title}`}
                    variant='top'
                  />
                  <Card.Body>
                    <Card.Title>{formattedBook.title}</Card.Title>
                    <p className='small'><em>Authors: {formattedBook.authors?.join(', ')}</em></p>
                    <Card.Text>{formattedBook.description}</Card.Text>

                    {formattedBook.bookId ? (
                      <Button
                        className='btn-block btn-danger'
                        onClick={() => {
                          console.log("🛑 Trying to delete book:", formattedBook);
                          handleDeleteBook(formattedBook.bookId);
                        }}
                      >
                        Delete this Book!
                      </Button>
                    ) : (
                      <p className="text-danger">❌ Cannot delete: Missing bookId</p>
                    )}

                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
