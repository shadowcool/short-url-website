export default function APIHome(req, res) {
    res.status(200).json({ message: "Welcome to the API Home Page", code: 200 });
}