export default function StartGame(props) {
    const handleClick = (e) => {
        props.handlePlayerOption(e.target.value);
    }
    return (
        <h1>
            <button onClick={handleClick} value='one'>One player</button>
            <button onClick={handleClick} value='two'>Two players</button>
        </h1>

    );
}