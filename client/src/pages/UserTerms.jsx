import Footer from "../components/Layout/Footer";
import Logo from "../components/UI/Logo";
import {ChevronLeft} from 'lucide-react';
import { useNavigate } from "react-router";

const UserTerms = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="w-full px-[10%] mb-10 min-h-screen">
        {/* logo here */}
        <div className="flex flex-row justify-between items-center mt-8 mb-14">
          <div className="w-2/5">
            <div
              onClick={() => navigate('/signup')}
              className="w-11 h-11 bg-teal-400 rounded-full p-1 cursor-pointer">
              <ChevronLeft size={35} />
            </div>
          </div>
          <div className="w-3/5 flex justify-start items-center">
            <Logo />
          </div>
        </div>
          
        <div className="p-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-5">Yard Sale User Terms & Conditions</h2>

          <div className="border p-4 rounded-md bg-gray-50 text-xl space-y-5">
            <p><strong>1. Account Registration:</strong> Users must provide accurate and complete information.</p>
            <p><strong>2. Item Listings:</strong> Only legal and appropriate items may be listed for sale.</p>
            <p><strong>3. Payments & Transactions:</strong> The platform is not responsible for transactions between buyers and sellers.</p>
            <p><strong>4. Prohibited Items:</strong> No sale of weapons, drugs, counterfeit goods, or illegal items.</p>
            <p><strong>5. User Conduct:</strong> No harassment, spam, or fraudulent activities.</p>
            <p><strong>6. Liability:</strong> The platform is not liable for any damages, disputes, or losses incurred.</p>
            <p><strong>7. Policy Changes:</strong> We may update these terms at any time.</p>
          </div>
        </div>

      </div>
      
      <Footer/>
    </>
  );
};

export default UserTerms;





