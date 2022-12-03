import "./styles.css";
import { CommentForm } from "./components/CommentForm";
import { PostProvider } from "./context/PostContext";
export default function App() {
  console.log("App Comp");
  return (
    <PostProvider>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <CommentForm />
      </div>
    </PostProvider>
  );
}
