class GetAPI{
    getListAPI(){
        return axios({
            url: "https://637b69a46f4024eac20ce266.mockapi.io/api/Capstone",
            method: "GET",
        })
    };

    deleteProductApi(id) {
        return axios({
          url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/Food/${id}`,
          method: "DELETE",
        });
      }
};

