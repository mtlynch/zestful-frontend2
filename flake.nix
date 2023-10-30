{
  description = "Dev environment for Zestful Frontend";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";

    # 20.6.1 release
    nodejs_dep.url = "github:NixOS/nixpkgs/78058d810644f5ed276804ce7ea9e82d92bee293";
  };

  outputs = { self, flake-utils, nodejs_dep }@inputs :
    flake-utils.lib.eachDefaultSystem (system:
    let
      nodejs_dep = inputs.nodejs_dep.legacyPackages.${system};
    in
    {
      devShells.default = nodejs_dep.mkShell {
        packages = [
          nodejs_dep.nodejs_20
        ];

        shellHook = ''
          echo "node" "$(node --version)"
          echo "npm" "$(npm --version)"
        '';
      };
    });
}
