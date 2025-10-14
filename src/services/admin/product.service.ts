import { prisma } from "config/client";

const handleCreateProduct = async (
  name: string,
  price: number,
  detailDesc: string,
  shortDesc: string,
  quantity: number,
  factory: string,
  target: string,
  image: string
) => {
  const newProduct = await prisma.product.create({
    data: {
      name,
      price: +price,
      detailDesc,
      shortDesc,
      quantity: +quantity,
      factory,
      target,
      image,
    },
  });
  return newProduct;
};

const getAllProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const getProductByID = async (id: string) => {
  const findProduct = await prisma.product.findUnique({
    where: { id: +id },
  });
  return findProduct;
};

const handleDeleteProduct = async (id: string) => {
  const deleteProduct = await prisma.product.delete({
    where: { id: +id },
  });
  return deleteProduct;
};

const updateProductById = async (
  id: number,
  name: string,
  price: number,
  detailDesc: string,
  shortDesc: string,
  quantity: number,
  factory: string,
  target: string,
  imageUpload: string
) => {
  await prisma.product.update({
    where: { id },
    data: {
      name,
      price,
      detailDesc,
      shortDesc,
      quantity,
      factory,
      target,
      ...(imageUpload && { image: imageUpload }),
    },
  });
};

// ✅ Export tất cả các hàm ở đây:
export {
  handleCreateProduct,
  getAllProducts,
  getProductByID,
  handleDeleteProduct,
  updateProductById,
};
