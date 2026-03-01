const HeroBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

      <div className="absolute inset-0">
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-40 bg-gradient-to-br from-indigo-600 to-indigo-800"
          style={{
            top: "20%",
            left: "10%",
            animation: "float1 20s ease-in-out infinite",
          }}
        />

        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-50 bg-gradient-to-br from-purple-600 to-purple-800"
          style={{
            top: "40%",
            left: "35%",
            animation: "float2 18s ease-in-out infinite",
          }}
        />

        <div
          className="absolute w-[700px] h-[700px] rounded-full blur-[110px] opacity-45 bg-gradient-to-br from-blue-600 to-blue-800"
          style={{
            top: "50%",
            right: "5%",
            animation: "float3 22s ease-in-out infinite",
          }}
        />

        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-30 bg-gradient-to-br from-purple-600 to-indigo-800"
          style={{
            top: "10%",
            right: "20%",
            animation: "float4 16s ease-in-out infinite",
          }}
        />

        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[90px] opacity-35 bg-gradient-to-br from-teal-600 to-teal-800"
          style={{
            bottom: "10%",
            left: "25%",
            animation: "float5 19s ease-in-out infinite",
          }}
        />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{}}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  );
};

export default HeroBackground;
