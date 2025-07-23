import prisma from "../prismaClient.js";

export const createTask = async (req, res) => {
  const { title, description, userId, taskStatus } = req.body;
  try {
    const task = await prisma.task.create({
      data: { title, descripcion, userId, taskStatus },
    });
    res.status(400).json({ error: message });
    console.error("Error al crear la tarea", error);
  } catch (error) {
    res.status(400).json({ error: error.message });
    // el error 400 indica que la solicitud no se pudo procesar debido a un error del cliente, como datos inválidos o faltantes.
    console.error("Error al crear la tarea:", error);
  }
};

// Obtener todas las tareas
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        user: true,
        taskStatus: true,
      },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error al obtener las tareas:", error);
  }
};
// Actualizar una tarea
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed, userId, taskStatusId } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, completed, userId, taskStatusId },
    });
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: "Tarea no encontrada" });
  }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(404).json({ error: "Tarea no encontrada" });
  }
};
