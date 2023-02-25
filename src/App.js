import React from "react";
import NavBar from "./components/Navbar";
import Image from "./components/Image";
class App extends React.Component {
  state = {
    category: "random",
  };

  handleCallback = (childData) => {
    this.setState({ category: childData });
  };

  render() {
    const { category } = this.state;
    return (
      <div>
        <NavBar parentCallback={this.handleCallback} />
        <Image category={category} />
      </div>
    );
  }
}
export default App;
