const Godown = require("../models/Godown");
const asyncHandler = require("express-async-handler");
const Item = require("../models/Item");


const findParent = (tree, parentId) => {
  if (tree.godown_id === parentId) return tree;
  if (!tree.children) return "null";

  for (const child of tree.children) {
    const found = findParent(child, parentId);
    if (found !== "null") return found;
  }
  return "null";
};

const getGodownTree = async (req, res) => {
  try {
    const godowns = await Godown.find(); // Fetch all godowns from the DB

    const root = {
      godown_id: "root",
      parent_godown: "null",
      name: "Warehouses",
      children: [],
      items: [],
    };

    godowns.forEach((godown) => {
      if (godown.parent_godown === "null") { //if godown has no parent, add it to the root
        root.children.push({
          godown_id: godown.godown_id,
          parent_godown: godown.parent_godown,
          name: godown.name,
          children: [],
          items: [],
        });
      } else {
        const parent = findParent(root, godown.parent_godown);
        if (parent !== "null") {
          parent.children.push({
            godown_id: godown.godown_id,
            parent_godown: godown.parent_godown,
            name: godown.name,
            children: [],
            items: [],
          });
        }
        else { // If parent not found, add it to the root
          root.children.push({
            godown_id: godown.godown_id,
            parent_godown: godown.parent_godown,
            name: godown.name,
            children: [],
            items: [],
          });
        } 
        // we can later implement a treeify to make sure the tree is in order
        // if its parent is added after it, so that it is added to the parent
        // but keep backend simple for now
      }
    });

    const items = await Item.find(); // Fetch items
    items.forEach((item) => {
      const godown = findParent(root, item.godown_id);
      if (godown!=="null") {
        godown.items.push(item); // Add the item to the godown's items list
      }
    });


    res.json(root); // Send the tree to the frontend
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getGodowns = asyncHandler(async (req, res) => {
  const godowns = await Godown.find();
  return res.json(godowns);
});

const createGodown = asyncHandler(async (req, res) => {
  const godown = new Godown(req.body);
  const createdGodown = await godown.save();
  return res.status(201).json(createdGodown);
});

const getGodownById = asyncHandler(async (req, res) => {
  const godown = await Godown.findById(req.params.id);
  if (godown) {
    return res.json(godown);
  } else {
    res.status(404);
    throw new Error("Godown not found");
  }
});

const deleteGodown = asyncHandler(async (req, res) => {
  const godown = await Godown.findById(req.params.id);
  if (godown) {
    await godown.remove();
    res.json({ message: "Godown removed" });
  } else {
    res.status(404);
    throw new Error("Godown not found");
  }
});

const updateGodown = asyncHandler(async (req, res) => {
  const godown = await Godown.findById(req.params.id);
  if (godown) {
    godown.name = req.body.name || godown.name;
    godown.parent = req.body.parent || godown.parent;
    const updatedGodown = await godown.save();
    res.json(updatedGodown);
  } else {
    res.status(404);
    throw new Error("Godown not found");
  }
});

const deleteAllGodowns = asyncHandler(async (req, res) => {
  await Godown.deleteMany();
  res.json({ message: "All godowns removed" });
});

module.exports = {
  getGodowns,
  createGodown,
  getGodownById,
  deleteGodown,
  updateGodown,
  deleteAllGodowns,
  getGodownTree,
};
