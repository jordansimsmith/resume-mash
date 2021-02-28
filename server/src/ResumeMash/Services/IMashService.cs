using System.Threading.Tasks;
using ResumeMash.Models;

namespace ResumeMash.Services
{
    public interface IMashService
    {
        /// <summary>
        /// Gets a Mash - a pairing of two resumes to be compared
        /// </summary>
        /// <returns></returns>
        Task<MashModel> GetMash();
    }
}