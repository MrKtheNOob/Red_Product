// Dashboard.jsx
import React from "react";
import Image from "next/image";
// KPI Card component
interface KpiCardProps {
  icon: React.ReactNode;
  count: number | string;
  label1: string;
  label2: string;
  bgColor: string;
  iconColor: string;
}

const KpiCard = ({
  icon,
  count,
  label1,
  label2,
  bgColor,
  iconColor,
}: KpiCardProps) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
    <div
      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${bgColor}`}
    >
      <span className={iconColor}>{icon}</span>
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800">
        {count}{" "}
        <span className="text-base font-normal text-gray-500">{label1}</span>
      </p>
      <p className="text-sm text-gray-500">{label2}</p>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Bienvenue sur RED Product
        </h2>
        <p className="text-gray-600 text-lg">
          Lorem ipsum dolor sit amet consectetur
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <KpiCard
          icon={<Image src="/mail.png" width={100} height={100} alt="icon" />}
          count={125}
          label1="Formulaires"
          label2="Je ne sais pas quoi mettre"
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <KpiCard
          icon={<Image src="/span.png" width={100} height={100} alt="icon" />}
          count={40}
          label1="Messages"
          label2="Je ne sais pas quoi mettre"
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <KpiCard
          icon={<Image src="/yellowpeople.png" width={100} height={100} alt="icon" />}
          count={600}
          label1="Utilisateurs"
          label2="Je ne sais pas quoi mettre"
          bgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />
        <KpiCard
          icon={<Image src="/redmail.png" width={100} height={100} alt="icon" />}
          count={25}
          label1="E-mails"
          label2="Je ne sais pas quoi mettre"
          bgColor="bg-red-100"
          iconColor="text-red-600"
        />
        <KpiCard
          icon={<Image src="/span2.png" width={100} height={100} alt="icon" />}
          count={40}
          label1="Hôtels"
          label2="Je ne sais pas quoi mettre"
          bgColor="bg-pink-100"
          iconColor="text-pink-600"
        />
        <KpiCard
          icon={<Image src="/bluepeople.png" width={100} height={100} alt="icon" />}
          count={2}
          label1="Entités"
          label2="Je ne sais pas quoi mettre"
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
      </div>
    </main>
  );
};

export default Dashboard;
