enum LightNumber {
  First = 1,
  Second = 2,
  Third = 3,
  Fourth = 4,
}

const lightManagementFunctions = {
  [LightNumber.First]: manageFirstLight,
  [LightNumber.Second]: manageSecondLight,
  [LightNumber.Third]: manageThirdLight,
  [LightNumber.Fourth]: manageFourthLight,
}

const LightControl = ({
  lightNumber,
  manageLight,
}: {
  lightNumber: LightNumber;
  manageLight: (state: 'on' | 'off') => Promise<void>;
}) => (osea
  <div className="flex flex-col gap-3 items-center justify-center">
    <span>ไฟสนามดวงที่{lightNumber}</span>
    <div className="flex items-center gap-3">
      <Button intent="success" onClick={async () => await manageLight('on')}>
        เปิดไฟ
      </Button>
      <Button intent="error" onClick={async () => await manageLight('off')}>
        ปิดไฟ
      </Button>
    </div>
  </div>
)

export default function AdminContent() {
  return (
    <div className="flex flex-col h-[calc(100vh-128px)] p-6">
      <div className="flex flex-col items-center gap-4 rounded-lg shadow-lg p-6">
        <span className="font-medium text-2xl">จัดการไฟสนาม</span>
        <div className="flex flex-wrap gap-4">
          {Object.values(LightNumber).map((lightNumber) => (
            <LightControl
              key={lightNumber}
              lightNumber={lightNumber}
              manageLight={lightManagementFunctions[lightNumber]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
