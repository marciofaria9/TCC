import prismaClient from "../../prisma";

class ListTodayOrdersService {
  
    async execute() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
  
      const orders = await prismaClient.order.findMany({
        where: {
          created_at: {
            gte: today,
            lt: tomorrow
          }
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });
      
      return orders;
    }
  }
  
  export { ListTodayOrdersService };