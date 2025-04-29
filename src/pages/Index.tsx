
import MainLayout from "@/components/MainLayout";
import ChatBox from "@/components/ChatBox";

const Index = () => {
  return (
    <MainLayout>
      <div className="flex flex-col h-full pt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Ask Me Anything Dashboard
        </h1>
        <div className="flex-1 h-[calc(100%-6rem)]">
          <ChatBox />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
