export default async function handler(req, res) {
  const response = await fetch("http://localhost:3000/api/projects/");
  const projects = await response.json();

  const { id } = req.query;

  const match = projects.find((project) => project._id == id);

  res.status(200).json(match);
}
