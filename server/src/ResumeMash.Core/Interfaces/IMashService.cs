using System.Threading.Tasks;
using ResumeMash.Core.Models;

namespace ResumeMash.Core.Interfaces
{
    public interface IMashService
    {
        /// <summary>
        ///     Gets a Mash - a pairing of two resumes to be compared
        /// </summary>
        /// <returns></returns>
        Task<MashModel> GetMashAsync();
    }
}