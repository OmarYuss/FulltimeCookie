import { PrismaClient } from '@prisma/client';
import { products, recipes } from '../../src/lib/data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.productVariation.deleteMany();
  await prisma.productPackageType.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️  Cleared existing data');

  // Seed products
  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images,
        dataAiHint: product.dataAiHint,
        category: product.category,
        tags: product.tags,
        details: product.details,
        hasRecipe: product.hasRecipe,
        recipeId: product.recipeId,
      },
    });

    // Create variations if they exist
    if (product.variations) {
      for (const variation of product.variations) {
        await prisma.productVariation.create({
          data: {
            productId: createdProduct.id,
            name: variation.name,
            priceModifier: variation.priceModifier,
            inStock: variation.inStock,
          },
        });
      }
    }

    // Create package types if they exist
    if (product.packageTypes) {
      for (const packageType of product.packageTypes) {
        await prisma.productPackageType.create({
          data: {
            productId: createdProduct.id,
            name: packageType.name,
            price: packageType.price,
          },
        });
      }
    }

    console.log(`✅ Created product: ${product.name}`);
  }

  // Seed recipes
  for (const recipe of recipes) {
    await prisma.recipe.create({
      data: {
        id: recipe.id,
        productId: recipe.productId,
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        isPaid: recipe.isPaid,
        price: recipe.price,
        rating: recipe.rating,
        reviews: recipe.reviews,
      },
    });

    console.log(`✅ Created recipe: ${recipe.name}`);
  }

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 